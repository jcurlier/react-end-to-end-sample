export function transitionRule(spec) {
  const transitions = Object.keys(spec).map(propName => `${propName} ${spec[propName]}`);

  if (transitions.length === 0) {
    return () => undefined;
  }

  return () => `transition: ${transitions.join(', ')};`;
}

export function uniformTransitionRule(timing, properties) {
  const spec = {};

  properties.forEach(p => spec[p] = timing);

  return transitionRule(spec);
}
