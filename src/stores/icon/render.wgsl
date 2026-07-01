struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vs_main(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VOut {
  var out: VOut;
  out.pos = vec4f(pos, 0.0, 1.0);
  out.uv = uv;
  return out;
}

@group(0) @binding(0) var samp: sampler;
@group(0) @binding(1) var tex: texture_2d<f32>;

@fragment
fn fs_main(in: VOut) -> @location(0) vec4f {
  return textureSample(tex, samp, in.uv);
}
