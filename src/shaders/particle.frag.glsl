#define SPRITE_WIDTH 16.0
#define SPRITE_HEIGHT 16.0

precision highp float;
uniform sampler2D DiffuseTexture;
uniform float spriteIndex;
varying float fLife;
uniform vec2 spriteDimensions;
// uniform float alphatest;
varying vec2 FragTexcoord;
uniform vec2 vUv;
void main()
{
     
    float sIndex =  clamp(floor(6.0-fLife),0.,6.);
    float u=clamp(floor(mod(gl_PointCoord.x,1.)*SPRITE_WIDTH)/SPRITE_WIDTH,0.,1.)/spriteDimensions.x+(sIndex*1./spriteDimensions.x);//+1.0/128.0;
    float v=clamp(floor(mod(gl_PointCoord.y,1.)*SPRITE_HEIGHT)/SPRITE_HEIGHT,0.,1.)/spriteDimensions.y;
    vec2 UV = vec2(u,v);
    
    vec4 texturedColor=texture2D(DiffuseTexture,vec2(UV.x+0.0015,UV.y));
  
    // // //if(texturedColor.a<alphatest)discard;      
    if(fLife<=0.0)
         {
             discard;
         } 
     else
     {
          gl_FragColor=texturedColor;
     }
    //vec2 uv2= gl_PointCoord;
    // gl_FragColor = texture2D(DiffuseTexture, gl_PointCoord);
  

    //gl_FragColor=vec4(fLife/4.0,0.0,0.0,1.0);
 
}

