import styles from "./page.module.css";
import Image from "next/image";
import Button from "../../../components/Button/Button";
import {items} from "./data.js";
import { notFound } from "next/navigation";



const getData=(cat)=>{
  const data=items[cat];
  if(data){
    return data;
  }
  return notFound();
}

 



const Category = async ({ params }) => {
  const resolvedParams = await params;
  const data = getData(resolvedParams.category);
  
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{resolvedParams.category}</h1>
      {data.map((item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.description}>{item.description}</p>
            <Button text="See More" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image
              src={item.image}
              alt={item.title}
              fill={true}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
export default Category;
