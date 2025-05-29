export function extractResources(json: any): Record<string, number> {
  const output: Record<string, number> = {};

  if (!json || !json.Inventory) return output;

  for (const item of json.Inventory) {
    if (!item.Item || !item.Quantity) continue;

    const name = item.Item.toLowerCase().replace(/\s+/g, '');
    const knownKeys = {
      neurodes: 'neurodes',
      oxium: 'oxium',
      forma: 'forma',
      ferrite: 'ferrite',
      salvage: 'salvage',
      morphics: 'morphics',
      alloyplate: 'alloyPlate',
      nanospores: 'nanoSpores',
      cryotic: 'cryotic',
      plastids: 'plastids',
      gallium: 'gallium',
      hexenon: 'hexenon',
      detoniteinjector: 'detoniteInjector',
      fieldron: 'fieldron',
      fieldronsample: 'fieldronSample',
      mutagenmass: 'mutagenMass',
      detoniteampule: 'detoniteAmpule',
      orokincell: 'orokinCell',
      tellurium: 'tellurium',
      polymers: 'polymerBundle',
      neuralSensors: 'neuralSensors',
    };

    const key = knownKeys[name];
    if (key) {
      output[key] = item.Quantity;
    }
  }

  return output;
}
