  precision highp float;

  //varying vec2 FragTexcoord;  
  uniform float pointsize;
  attribute vec3 cameraeye;
  attribute float life;

  varying float fLife;

  void main() {
     fLife = life;
     vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
	 gl_Position = projectionMatrix * modelViewPosition;
     float p = pointsize/(6.0/fLife);
      
     gl_PointSize =  p/ gl_Position.w*12.0;
    
        //gl_PointSize = 16.0;

    // FragTexcoord = vec2(uv.x,uv.y) ;   
         
    // mat4 modelView = modelViewMatrix;   
    // modelView[0][0] = 1.0;
    // modelView[0][1] = 0.0;
    // modelView[0][2] = 0.0;
	// modelView[1][0] = 0.0;
    // modelView[1][1] = 1.0;
    // modelView[1][2] = 0.0;
    // modelView[2][0] = 0.0;
    // modelView[2][1] = 0.0;
    // modelView[2][2] = 1.0;
    // gl_Position = projectionMatrix * (modelViewMatrix) * vec4(position, 1.0 );
    
    // float fogDistance = length(gl_Position.xyz);
    // fogDepth = -(modelViewMatrix * vec4( position, 1.0 )).z;   
  }