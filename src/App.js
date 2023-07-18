import './App.css';
import React, { useState, useEffect } from "react";

import libmoji from "libmoji";

function App() {
  // state management
  const [gender, setGender] = useState(['male', 1])
  const [style, setStyle] = useState(["bitmoji", 4])
  const [traits, setTraits] = useState([])
  const [url, setUrl] = useState("")
  const [outfit, setOutfit] = useState(1018138)
  const [prt1, setPrt1] = useState("flex")
  const [prt2, setPrt2] = useState("none")
  const [sliderValue, setSliderValue] = useState(0)
  const [currentTrait, setCurrentTrait] = useState("beard")
  const [min, setMin] = useState(1)
  const [max, setMax] = useState()
  const [ct, setCt] = useState(0)
  const [slidervaluenum, setSlidervaluenum] = useState("1")
  const [ctr, setCtr] = useState([])
  

  // click functions
  const manClick = () => {
    setPrt1("none")
    setPrt2("flex")
    setGender(['male', 1])
    setCurrentTrait("beard")
    setMax(libmoji.getTraits("male", "bitmoji")[ct].options.length -1)
  }

  const womanClick = () => {
    setPrt1("none")
    setPrt2("flex")
    setGender(['female', 2])
    setCurrentTrait("brow")
    setMax(libmoji.getTraits("female", "bitmoji")[ct].options.length -1)
  }

  const sliderChange = (event) => {
    setSlidervaluenum(event.target.value)
    setSliderValue(event.target.value)
    if(gender[0] == "male"){
    //console.log(libmoji.getTraits("male", "bitmoji")[ct].options[event.target.value].value)
    var numog = libmoji.getTraits("male", "bitmoji")[ct].options.sort(function (a, b) {
      return a.value - b.value;
    });

    var num = numog[event.target.value].value
    //setTraits([[currentTrait, num]])
    setTraits( arr => [...arr, [currentTrait, num]]);
    if(ctr.includes(currentTrait)){
      var ind = ctr.indexOf(currentTrait)
      traits[ind] = [currentTrait, num];
    } else {
      setCtr( arr => [...arr, currentTrait]);
      setTraits( arr => [...arr, [currentTrait, num]]);
    }
    } else {
      var numog = libmoji.getTraits("female", "bitmoji")[ct].options.sort(function (a, b) {
        return a.value - b.value;
      });
  
      var num = numog[event.target.value].value
      //setTraits([[currentTrait, num]])
      setTraits( arr => [...arr, [currentTrait, num]]);
      if(ctr.includes(currentTrait)){
        var ind = ctr.indexOf(currentTrait)
        traits[ind] = [currentTrait, num];
      } else {
        setCtr( arr => [...arr, currentTrait]);
        setTraits( arr => [...arr, [currentTrait, num]]);
      }
    }
  }

  const onTraitChange = (event) => {
    setCurrentTrait(event.target.value)
    setCt(event.target.options.selectedIndex)
    setSlidervaluenum("1")
  }

  const opclick = (event) => {
  }

  // useEffects
  useEffect(() => {
    if(gender[1] == 1){
      setUrl(libmoji.buildPreviewUrl("head",3,1,style[1],0,traits,outfit))
    } else {
    setUrl(libmoji.buildPreviewUrl("head",3,2,style[1],0,traits,outfit))
    }
    //console.log(url)
  }, [gender]);

  useEffect(() => {
    if(gender[1] == 1){
      setUrl(libmoji.buildPreviewUrl("head",3,1,style[1],0,traits,outfit))
    } else {
    setUrl(libmoji.buildPreviewUrl("head",3,2,style[1],0,traits,outfit))
    }
  }, [traits]);

  useEffect(() => {
    setMax(libmoji.getTraits(gender[0], "bitmoji")[ct].options.length -1)
  }, [ct]);


  // functional returns
  function SelectOptions(){
    return (
      <select id="select1" value={currentTrait}  onChange={onTraitChange}>
      {libmoji.getTraits("male", "bitmoji").map((item, i) => (
        <option value={item.key}>
          {item.key}
        </option>
      ))}
      </select>
    )
  }

  function SelectOptionsT(){
    return (
      <select id="select1" value={currentTrait}  onChange={onTraitChange}>
      {libmoji.getTraits("female", "bitmoji").map((item, i) => (
        <option value={item.key}>
          {item.key}
        </option>
      ))}
      </select>
    )
  }

  return (
    <div className="App">
      <div className="choose-screen" style={{display: prt1}}>
        <h1 id="main-title-choose-gender">
          Choose Your Base!
        </h1>
        <div id="choose">
        <img onClick={manClick} id="man" src="https://raw.githubusercontent.com/jtocool7/bitmoji-avatar-test/main/man.webp"/>
        <img onClick={womanClick} id="woman" src="https://raw.githubusercontent.com/jtocool7/bitmoji-avatar-test/main/woman.webp"/>
        </div>
      </div>
      <div className="choose-traits" style={{display:prt2}}>
      <h1 id="main-title-choose-gender">
          Choose Your Traits!
        </h1>
        <img onClick={manClick} className="avatar" src={url}/>
          {gender[0] === "male" ? <SelectOptions/>: <SelectOptionsT/>}
        <input step="1" value={slidervaluenum} type="range" min="0" max={max}  className="slider" id="myRange" onChange={sliderChange}/>
      </div>
    </div>
  );
}

export default App;
