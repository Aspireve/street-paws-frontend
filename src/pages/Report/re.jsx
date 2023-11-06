import React, { useEffect, useState } from "react";
import {animals, sickness} from "../../preset"
import pickle from "pickle"

function Main() {
  let count = 0;
  const [outputImg, setOutputImg] = useState();
  const loadFile = (e) => {
    setOutputImg(URL.createObjectURL(e.target.files[count]))
    count+=1;
  }
  useEffect(() => {
    model = pickle.loads()
  },[])
  const [setVal, getVal] = useState("")
  return (
    <div className="main">
      <form>
      <input
        type="file"
        accept="image/*"
        name="picture"
        id="file"
        capture="user"
        onChange={loadFile}
        style={{display: "none"}}
      ></input>
      <label for="file" >Upload Image</label>
      {outputImg && <img id="output" src={outputImg} width="200" />}
      <input
        style={{ height: "30px", width: "20%" }}
        list="data"
        onChange={(e) => setVal(e.target.value)}
        placeholder="Search"
      />
      <datalist id="data">
        {animals.map((op) => (
          <option>{op}</option>
        ))}
      </datalist>

      <input
        style={{ height: "30px", width: "20%" }}
        list="symptoms1"
        onChange={(e) => setVal(e.target.value)}
        placeholder="Search"
      />
      <datalist id="symptoms1">
        {sickness.map((op) => (
          <option>{op}</option>
        ))}
      </datalist>
      <div></div>
      <input
        style={{ height: "30px", width: "20%" }}
        list="symptoms2"
        onChange={(e) => setVal(e.target.value)}
        placeholder="Search"
      />
      <datalist id="symptoms2">
        {sickness.map((op) => (
          <option>{op}</option>
        ))}
      </datalist>
      <div></div>
      <input
        style={{ height: "30px", width: "20%" }}
        list="symptoms3"
        onChange={(e) => setVal(e.target.value)}
        placeholder="Search"
      />
      <datalist id="symptoms3">
        {sickness.map((op) => (
          <option>{op}</option>
        ))}
      </datalist>
      <div></div>
      <input
        style={{ height: "30px", width: "20%" }}
        list="symptoms4"
        onChange={(e) => setVal(e.target.value)}
        placeholder="Search"
      />
      <datalist id="symptoms4">
        {sickness.map((op) => (
          <option>{op}</option>
        ))}
      </datalist>
      <div></div>
      <input
        style={{ height: "30px", width: "20%" }}
        list="symptoms5"
        onChange={(e) => setVal(e.target.value)}
        placeholder="Search"
      />
      <datalist id="symptoms5">
        {sickness.map((op) => (
          <option>{op}</option>
        ))}
      </datalist>
      <div></div>
      <textarea style={{width:"60%"}}rows={3} placeholder="Any more notes"/>
          <button type="submit" > Submit </button>
      </form>
    </div>

  );
}

export default Main;
