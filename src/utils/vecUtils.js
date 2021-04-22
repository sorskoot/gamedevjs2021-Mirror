export const VecUtils = {
    toThreeVector3(vec) {
        return new THREE.Vector3(vec.x, vec.y, vec.z);
    },
    lerpVec(vec1, vec2, i) {
        return {
            x:THREE.MathUtils.lerp(vec1.x, vec2.x, i),
            y:THREE.MathUtils.lerp(vec1.y, vec2.y, i),
            z:THREE.MathUtils.lerp(vec1.z, vec2.z, i)
        }
        
    }
}