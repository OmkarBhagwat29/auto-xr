import { createContext, useContext,useState,useEffect } from "react";
import rhino3dm from "rhino3dm";

const RhinoContext = createContext()

const RhinoProvider = (props) => {
    const [rhinoInstance, setRhinoInstance] = useState(null);
  
    useEffect(() => {
      const initializeRhino = async () => {
        const instance = await rhino3dm();
        setRhinoInstance(instance);
      };
  
      initializeRhino();
    }, []);
  
    return (
      <RhinoContext.Provider value={rhinoInstance}>
        {props.children}
      </RhinoContext.Provider>
    );
  };
const useRhino = ()=> useContext(RhinoContext)

export {RhinoProvider,useRhino}