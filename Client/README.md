user create form
# responsivenes 

/*   create user form  */

.userbody {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
}

/* image wrapper */
#frmImg {
    border: 1px solid red;
    max-height: 60vh;
    overflow: hidden;
    flex: 1;                    /* allows flexible resizing */
}

#frmImg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* container for image + form */
#userlogcontain {
    width: 80%;
    max-width: 1100px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid gold;
    margin: 100px auto;
    gap: 20px;                /* spacing between form and image */
}

/* user create form */
#userform {
    border: 1px solid blue;
    flex: 1;                   /* allows flexible resizing */
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    padding: 20px;
    background-color: whitesmoke;
    border-radius: 20px;
}

#usersub {
    background-color: rgb(102, 102, 255);
    color: white;
    font-weight: bold;
    font-size: 20px;
    padding: 6px 15px;
    border-radius: 10px;
    width: 120px;
    align-self: center;        /* centers the button */
    margin-top: auto;          /* pushes button to bottom */
}

/* ✅ RESPONSIVENESS FIX */
@media (max-width: 900px) {
    #userlogcontain {
        flex-direction: column;
        width: 95%;
        margin-top: 50px;
    }

    #frmImg {
        width: 100%;
        max-height: 300px;
    }

    #userform {
        width: 100%;
    }

    #usersub {
        position: static;     /* remove absolute position */
        margin-top: 15px;
    }
}

@media (max-width: 500px) {
    #userform {
        padding: 15px;
    }

    .userfrmlabel {
        font-size: 16px;
        margin-top: 20px;
    }

    .userfrminput {
        font-size: 16px;
        padding: 5px 10px;
    }
}



