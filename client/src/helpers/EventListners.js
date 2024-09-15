import { Raycaster, Vector2 } from "three";

export const handleDoubleClickOnObject = (event, camera, objsAdded) => {
  const ray = new Raycaster();

  const mouse = new Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  ray.setFromCamera(mouse, camera);

  const intersects = ray.intersectObjects(objsAdded);

  if (intersects.length > 0) {
    console.log(intersectedObj);
    return intersects[0].object.parent;
  }

  return null;
};
