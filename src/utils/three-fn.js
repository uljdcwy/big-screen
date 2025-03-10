import shapefile from "shapefile"

export const drawBuildinf = (pathShp, THREE, scene) => {
    shapefile.open(pathShp)
        .then(source => source.read()
            .then(function log(result) {
                if (result.done) return;
                const coordinates = result.value.geometry.coordinates;
                createShapeFromCoordinates(coordinates);
                return source.read().then(log);
            }))
        .catch(error => console.error(error));

    function createShapeFromCoordinates(coordinates) {
        const shape = new THREE.Shape();
        coordinates[0].forEach((point, index) => {
            const [x, y] = point;
            if (index === 0) shape.moveTo(x, y);
            else shape.lineTo(x, y);
        });

        const extrudeSettings = { depth: 5, bevelEnabled: false };
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        const mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);
    }
}