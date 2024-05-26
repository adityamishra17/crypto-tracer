import React from 'react'
import { makeStyles } from 'tss-react/mui'



const SelectButton = ({ children, selected, onClick }) => {
    const useStyles = makeStyles()(() => {
        return {
            selectbutton: {
                border: "1px solid #388E3C",
                borderRadius: 5,
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                fontFamily: "Montserrat",
                cursor: "pointer",
                backgroundColor: selected ? "#388E3C" : "",
                color: selected ? "black" : "",
                fontWeight: selected ? 700 : 500,
                "&:hover": {
                    backgroundColor: "#388E3C",
                    color: "black",
                },
                width: "22%",
                //   margin: 5,
            },
        }
    })

    const {classes} = useStyles();

    return (
        <span onClick={onClick} className={classes.selectbutton} >
            {children}
        </span>
    )
}

export default SelectButton