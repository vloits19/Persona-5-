"use client";

import { useEffect, useRef, useCallback } from "react";

interface ChromaKeyOptions {
  keyColor?: [number, number, number];
  threshold?: number;
  smoothing?: number;
}

export function useChromaKey(options: ChromaKeyOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const rafRef = useRef<number>(0);

  const {
    keyColor = [0, 255, 0],
    threshold = 0.4,
    smoothing = 0.1,
  } = options;

  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, alpha: true });
    if (!gl) return;
    glRef.current = gl;

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;

    // Fragment shader — chroma key removal
    const fsSource = `
      precision mediump float;
      varying vec2 v_texCoord;
      uniform sampler2D u_image;
      uniform vec3 u_keyColor;
      uniform float u_threshold;
      uniform float u_smoothing;

      void main() {
        vec4 color = texture2D(u_image, v_texCoord);
        float diff = length(color.rgb - u_keyColor);
        float alpha = smoothstep(u_threshold, u_threshold + u_smoothing, diff);
        gl_FragColor = vec4(color.rgb * alpha, alpha);
      }
    `;

    const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource)!;
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource)!;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    // Geometry — full-screen quad
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const texBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    const texLoc = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

    // Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    textureRef.current = texture;

    // Set uniforms
    gl.uniform3f(
      gl.getUniformLocation(program, "u_keyColor"),
      keyColor[0] / 255,
      keyColor[1] / 255,
      keyColor[2] / 255
    );
    gl.uniform1f(gl.getUniformLocation(program, "u_threshold"), threshold);
    gl.uniform1f(gl.getUniformLocation(program, "u_smoothing"), smoothing);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }, [keyColor, threshold, smoothing]);

  const renderFrame = useCallback(function renderFrame() {
    const gl = glRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!gl || !video || !canvas || video.paused || video.ended) return;

    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth || 1920;
      canvas.height = video.videoHeight || 1080;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    rafRef.current = requestAnimationFrame(renderFrame);
  }, []);

  const startRendering = useCallback(() => {
    initGL();
    rafRef.current = requestAnimationFrame(renderFrame);
  }, [initGL, renderFrame]);

  const stopRendering = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { canvasRef, videoRef, startRendering, stopRendering };
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
