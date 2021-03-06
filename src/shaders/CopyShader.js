import vertex from 'glsl/vertex/basic.glsl';
import fragment from 'glsl/fragment/copy.glsl';

export default {
  uniforms: {
    tDiffuse: { type: 't', value: null },
    opacity: { type: 'f', value: 1.0 },
    alpha: { type: 'i', value: 0 },
  },

  vertexShader: vertex,
  fragmentShader: fragment,
};
