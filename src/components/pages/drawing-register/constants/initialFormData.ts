import { FormData } from '../types';

export const INITIAL_FORM_DATA: FormData = {
  id: 0,
  planNumber: null,
  prefecture: null,
  city: null,
  windSpeed: null,
  boardSide: null,
  measurements: [
    { width: null, height: null, bottomMargin: null, surfaces: null }
  ],
  pillar: {
    count: null,
    size: null,
    thickness: null,
    holeDepth: null,
    embedment: null,
    foundation: null,
    embrace: null,
    structuralBase: null,
    leftExtension: null,
    rightExtension: null,
    spacings: [
      { width: null },
      { width: null },
      { width: null },
      { width: null }
    ],
    maxControlWidth: null,
    maxFaceWidth: null,
    furringSize: null,
    furringCount: null,
    furringSpacings: [
      { width: null },
      { width: null },
      { width: null },
      { width: null }
    ],
    topOverhang: null,
    bottomOverhang: null,
    furringThickness: null,
    maxFurringPitch: null,
    embrace11v: null,
    aluminumPitch: null,
    topDistance: null
  },
  files: []
}; 