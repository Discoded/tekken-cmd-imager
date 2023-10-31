import {useState, useEffect, useRef} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import mergeImages from 'merge-images'

import './HomeComponent.css'

//Theme
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// IMAGES_SRC URL
const IMAGES_SRC = require.context('./../../../public/assets/', true);

const ARROW_URL = './arrow/';
const BUTTON_URL = './button/';
const PNG = '.png';


function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

export default function HomePage({theTheme}) {
    const [theInput, setTheInput] = useState("")
    const [theImage, setTheImage] = useState("")
    const [commandTable, setCommandTable] = useState([]);

    const submitHandler = (e) => {
        arrayCreator(theInput.split(', '));
        e.preventDefault();
    }

    const handleChange = (e) => {
        setTheInput(e.target.value)
    }

    const arrayCreator = (theArray) => {
        const theTestArray = theArray;
        const newArray = [];

        for (var i=0; i<theTestArray.length; i++){

            // Button Condition
            if(/[0-9]$/.test(theTestArray[i])){
                //console.log('Button Condition', theTestArray[i])
                newArray.push({src: IMAGES_SRC(BUTTON_URL + theTestArray[i] + PNG), x: i*625, y: 0})
            } 
            // Chevron condition: element is ''
            else if (theTestArray[i] === '' || theTestArray[i] === ' '){
                newArray.push({src: IMAGES_SRC(ARROW_URL + 'chevron' + PNG), x: i*625, y: 0})
            } 
            // Arrow Condition
            else if(/^([a-z]){1,3}$/.test(theTestArray[i])){
                //console.log('Arrow Condition', theTestArray[i])
                newArray.push({src: IMAGES_SRC(ARROW_URL + theTestArray[i] + PNG), x: i*625, y: 0})
            }
            // Text/Other condition
            else {
                console.log("ELSE CONDITION", theTestArray[i])
                const canvas = document.createElement('canvas');
                canvas.height = "625"
                canvas.width = "625"
                const ctx = canvas.getContext('2d');
                ctx.font = '200px Arial';
                ctx.fillStyle= 'white'
                const lines = getLines(ctx, theTestArray[i], 625);
                lines.map((element, index) => {
                    ctx.fillText(element, 0, 200*(index+1), 625)
                })
                const dataUrl = canvas.toDataURL();
                newArray.push({src: dataUrl, x: i*625, y: 0})
            }
            
        }

        

        mergeImages(newArray, {width: 625*theTestArray.length})
        .then(src => {
            setTheImage(src);
            setCommandTable([src, ...commandTable]);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        console.log("useEffect call")
        
    }, [theImage])
    

    return(
        
        <ThemeProvider theme={theTheme}>
        <CssBaseline />
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '80%' }
                }}
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <TextField fullWidth id="standard-basic" label="Input" value={theInput} onChange={handleChange} variant="filled" sx={{display: "flex", margin: "auto"}}/>
                <Button variant="outlined" onClick={submitHandler}>Submit</Button>
            </Box>
            {commandTable.length > 0 ? commandTable.map(img => 
                
                <Box sx={{border: commandTable.length == 0 ? 0:1, borderRadius: '16px', display: "flex", flexDirection: "column", margin: 1, width: "auto", height: "1000"}}>
                
                    <img key={img}src={img}/>
                
                </Box>
            ) : null}
            
           
        </ThemeProvider>
    )
        
}