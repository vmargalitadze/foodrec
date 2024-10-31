export default function Image({src,...rest}) {
  src = src && src.includes('https://')
    ? src
    : 'https://foodrec-p1r8.onrender.com/'+src;
  return (
    <img {...rest} src={src} alt={''} />
  );
}





// https://foodrec-p1r8.onrender.com