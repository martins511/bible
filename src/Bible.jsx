import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";

const Bible = () => {
  const [book, setBook] = useState("john");
  const [bookInput, setBookInput] =useState("")
  const [chapter, setChapter] = useState(3);
  const [chapterInput, setChapterInput] = useState(3);
  const [verse, setVerse] = useState(3);
  const [verseInput, setVerseInput] = useState(3);
  const getBiblVerse = async () => {
    const { data } = await axios.get(
      `https://ajith-holy-bible.p.rapidapi.com/GetVerseOfaChapter?Book=${book}&chapter=${chapter}&Verse=${verse}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "1dd5fc63d7msh1469c820361f2ccp106ce3jsn3d0cd6a68fca",
          "X-RapidAPI-Host": "ajith-holy-bible.p.rapidapi.com",
        },
      }
      );
      return data
  };

  const handleSubmit = (e) =>  {
    if (e.keyCode !== 13) return;
    
    setBook(bookInput);
    setChapter(chapterInput);
    setVerse(verseInput);
  }

//console.log("DATA", data);
  const { data, isError, isLoading,error } = useQuery(["getverse", book, chapter, verse], getBiblVerse);
        if(isLoading){
          return <h2>Loading....</h2>
        }

        if(isError){
         return <h2>Wrong slection!!! Please try again</h2>
        }
        const enterBook =(e)=>{
            setBookInput(e.target.value)
        }

        const enterChapter =(e)=>{
          setChapterInput(e.target.value)
        }
        
        const enterVerse =(e)=>{
          setVerseInput(e.target.value)
        }

  return( 
    <>
    <div>
        <input type="text" placeholder="book" value={bookInput} onKeyDown={handleSubmit} onChange={enterBook} />
        <input type="number" placeholder="chapter" value={chapterInput} onKeyDown={handleSubmit} onChange={enterChapter}/>
        <input type="number" placeholder="verse" value={verseInput} onKeyDown={handleSubmit} onChange={enterVerse}/>
    </div>
    <div className="output">
      <p>{data?.Output}</p>
    </div>
    </>
    );
};

export default Bible;
