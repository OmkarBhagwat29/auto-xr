

import { useRef } from 'react'
import { useDoc } from '../context/DocContext'
import '../css/panel.css'
import { useState, useEffect } from 'react'

export default function PanelUI() {
    const doc = useDoc()
    const asideRef = useRef()
    const tableRef = useRef()
    const collapsRef = useRef()
    const [resizeWidth, setResizeWidth] = useState('20vw');
    const [syncCount, setSyncCount] = useState(0);

    const [htmlLayers, setHtmlLayers] = useState(null)

    useEffect(() => {
        if (!doc)
            return

        const layerTable = doc.layers()

        const layers = []
        for(let i =0; i<layerTable.count;i++)
        {
            const la = layerTable.get(i)
            layers.push(la)
        }
        //console.log(layers)
        setHtmlLayers(layers)
        setSyncCount(syncCount+1)

    }, [doc])

    const [isNavOpen, setIsNavOpen] = useState(true)

    const toggleNav = () => {

        setIsNavOpen(!isNavOpen)
    }

    const handleMouseDown = (e) => {
        const diff = asideRef.current.offsetWidth - e.clientX
        if(diff>15)
            return;
        setResizeWidth(asideRef.current.offsetWidth - e.clientX);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      };
    
      const handleMouseMove = (e) => {

        const newWidth = e.clientX + resizeWidth;
        asideRef.current.style.width = `${newWidth}px`;
        tableRef.current.style.width = `${newWidth}px`;
        collapsRef.current.style.left = `${newWidth}px`;
      };

      const handleMouseMoveInside = (e)=>{
        // Reset the cursor when inside the aside element
        const diff = asideRef.current.offsetWidth - e.clientX
        if(diff>15)
            document.body.style.cursor = 'auto';
        else
            document.body.style.cursor = 'ew-resize'
      }
    
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseleave',handleMouseLeave);
        document.removeEventListener('mouseover',handleMouseOver);
        document.removeEventListener('mousemove',handleMouseMoveInside);
      };

      const handleMouseOver = (e)=>{
            document.body.style.cursor = 'ew-resize';
      }

      const handleMouseLeave = (e) => {
        // Reset the cursor when leaving the aside element
        document.body.style.cursor = 'auto';
      };

    return (
        <div key={syncCount}>
           {isNavOpen && <aside ref={asideRef} style={{ userSelect:'none'}} onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMoveInside}>
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                <th>Layer</th>
                                <th>Show</th>
                                <th>Lock</th>
                                <th>Display</th>
                                <th>Material</th>
                            </tr>
                        </thead>
                        {/* Enter tBody here coming from doc */}
                        <tbody>
                            {htmlLayers &&
                                <>
                                   {htmlLayers.map((layer,index)=>{
                                    return <tr key={index}>
                                        <td>
                                            {layer.name}
                                        </td>
                                        <td>
                                            <label htmlFor="visible"></label>
                                            <input type="checkbox" id='visible' name='visible' defaultChecked={layer.visible}/>
                                        </td>
                                        <td>
                                            <label htmlFor="lock"></label>
                                            <input type="checkbox" id='lock' name = 'lock' defaultChecked={layer.locked} />
                                           
                                        </td>
                                        <td>
                                            <select name="display" id="display">
                                                <option value="shaded">shade</option>
                                                <option value="wireframe">wireframe</option>
                                                <option value="ghosted">ghost</option>
                                                <option value="rendered">ghost</option>
                                            </select>
                                        </td>
                                        <td>
                                            {'None'}
                                        </td>
                                    </tr>
                                   })}
                                </>}
                        </tbody>
                    </table>
            </aside>} 

            <img ref={collapsRef} src="./arrow.png" alt="hide bar" onClick={toggleNav} style={{ width: '50px', position:'fixed', top: '50vh', left: isNavOpen ? '250px' : '0', zIndex: '1001', opacity: '0.25' }} />
        </div>
    );
}