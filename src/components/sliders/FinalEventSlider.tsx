import { singleEventContextStore } from ".././././../contexts/eventContext";
export const FinalSlider = ({ item , type }: any) => {
 
  return (
    type == "top" ?
    <div className="carousel-cell"><img height="100%" width="100%" className='object-fit' src={item} alt="Description" /></div>
    :     <div className="carousel-cell-1"><img height="100%" width="100%" className='object-cover' src={item} alt="Thumbnail" /></div>


  );
};
