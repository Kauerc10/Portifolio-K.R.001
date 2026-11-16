const sharp = require('sharp');
const fs = require('fs');
(async()=>{
 const width=1024,height=768;
 const color=await sharp('docs/design-transition/assets/hero-quality/restoration-candidate.png').resize(width,height).removeAlpha().raw().toBuffer();
 const old=await sharp('public/images/hero-paths-id.webp').resize(width,height).removeAlpha().raw().toBuffer();
 const result=Buffer.alloc(width*height*3); let selected=0;
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const p=(y*width+x)*3,r=color[p],g=color[p+1],b=color[p+2];
  if(!(b>g*1.14&&r>g*1.10&&b-g>20))continue;
  let best=Infinity,channel=-1;
  for(let dy=-28;dy<=28;dy+=2)for(let dx=-28;dx<=28;dx+=2){
   const xx=x+dx,yy=y+dy;if(xx<0||xx>=width||yy<0||yy>=height)continue;
   const q=(yy*width+xx)*3;
   for(let c=0;c<3;c++)if(old[q+c]>120&&dx*dx+dy*dy<best){best=dx*dx+dy*dy;channel=c;}
  }
  if(channel>=0){result[p+channel]=255;selected++;}
 }
 await sharp(result,{raw:{width,height,channels:3}}).webp({lossless:true,effort:6}).toFile('public/images/hero-detailed-paths.webp');
 await sharp('public/images/hero-depth.webp').webp({lossless:true}).toFile('public/images/hero-detailed-depth.webp');
 console.log({selected,pathsBytes:fs.statSync('public/images/hero-detailed-paths.webp').size});
})();
