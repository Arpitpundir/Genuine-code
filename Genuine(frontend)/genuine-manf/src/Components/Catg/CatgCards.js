import React from "react"
import CatgCard from "./CatgCard"
import HorizontalFlexbox from "./../Flexbox/horizontalFlexbox"

export default (props) => {
  let catgCards = []
  props.catgs.forEach(catg => {
    catgCards.push(<CatgCard catgId = {catg._id} catgName = {catg.name} productCount = {catg.prdCount}/>)
  });
  return (
    <HorizontalFlexbox>
      {catgCards}
    </HorizontalFlexbox>
  )
}