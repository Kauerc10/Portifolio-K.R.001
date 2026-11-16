/** Image coordinates are in the immutable 1672 × 941 reference, never world units. */
export const portalArt = {
  width: 1672, height: 941, mobileCropTop: 240,
  reference: 'docs/design-transition/assets/ribbon-portals/model-reference.png',
  maskVersion: 1,
  futureExit: { point: [135,941], tangent: [-.72,.69], apparentWidth: 274, color: '#6534D8' },
} as const;
export const portalDestinations = [
  {id:'development',href:'#projetos',anchor:[298,347]},
  {id:'automation',href:'#project-atlas',anchor:[867,309]},
  {id:'support',href:'#experiencia',anchor:[1406,354]},
] as const;
export type PortalDestination = typeof portalDestinations[number]['id'];
