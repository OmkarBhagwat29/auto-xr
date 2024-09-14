// rhinoLoader.js
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader.js';

// Create and configure the Rhino3dmLoader
const loader = new Rhino3dmLoader();
loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@8.0.1/');

// Export the loader so it can be used in other files
export default loader;