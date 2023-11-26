import { Component } from "react"
import { getSongs, addSong } from '../stores/appStore'
import { Box, FormControl, FormGroup, TextField, Input, InputLabel, CircularProgress, Button } from "@mui/material";

import Modal from "@mui/material/Modal";
import styled from "styled-components";
let StyledInput = styled(Input)`
  input {
    width: 100%;
    text-align: left;
  }
`;

let StyledFormControl = styled(FormControl)`
  width: 100%;
  height: "100%";
  background-color: rgb(20, 20, 20);
`;

let StyledHeader = styled(Box)`
  width: 100%;
  font-size: 1.5rem;
  padding: 1.5rem;
  text-align: center;
  color: white;
  background-color:  #535353;
  margin-bottom:2rem;

`;

let StyledDiv = styled(Box)`
  background-color: #535353;
  margin: 1.5rem;
`;

let StyledDivGenre = styled(Box)`
  background-color: #363636;
  padding: 0.5rem;
`;

let StyledSong = styled(Box)`
  padding: 0.5rem;
`;

let StyledTitle = styled(Box)`
  color: white;
  text-align: left;
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
`;
let StyledArtist = styled(Box)`
  color: grey;
  text-align: left;
  margin-top: 0.5rem;
  font-size: 1rem;
`;

let StyledButton = styled.button`
  background-color: #5a2cff;
  font-size: 1rem;
  color: white;
  border: #5a2cff 1px solid;
  box-shadow: 0 0 1px 1px rgb(138, 137, 137);
  margin-left: 5rem;
  padding: 1rem;
  border-radius: 1rem;
  //justify-content: right;
  font-weight: bold;
  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    margin-left: -3rem;
    margin-top: 1rem;
    border-radius: 0rem;
    box-shadow: 0 0 0 0;
  }
  `;


let StyledModal = styled(Modal)`
width: "100%";
height: "100%";
display: flex;
align-self: "center";
justify-content: "center";
align-items: "center";
`;

let StyledModalButton = styled.button`
font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  `;


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            title: "",
            artist: "",
            genre: "",
            isOpenModal: false,
            isLoading: false
        };
    }

    async componentDidMount() {
        const songsList = await getSongs()
        this.setState({ songs: songsList });
    }

    addTrack = async () => {
        try {

            if (!this.state.title || !this.state.artist || !this.state.genre) {
                alert("Please fill in all fields")
                return
            }
            await addSong(this.state.title, this.state.artist, this.state.genre)
            alert("The song has been successfully added")
            this.render()
            this.setState({ isOpenModal: false })


        } catch (error) {
            alert(error.message)
        }


    };


    handleClickModal = () => {
        this.setState({ isOpenModal: !this.state.isOpenModal })
    }

    render() {
        const { songs } = this.state;
        const { isLoading } = this.state;

        if (isLoading) return <div className="loading">Loading&#8230;</div>
        return (
            <StyledFormControl>
                <StyledHeader>{"Mini Music Library Web Application"}
                    <StyledButton onClick={this.handleClickModal} className="addBtn">ADD TRACK</StyledButton>
                </StyledHeader>


                {!isLoading && songs.map(song => <StyledDiv>
                    <StyledSong>
                        <StyledTitle>{song.title}</StyledTitle>
                        <StyledArtist>{song.artist}</StyledArtist>
                    </StyledSong>
                    <StyledDivGenre>
                        <StyledArtist>{song.genre}</StyledArtist>
                    </StyledDivGenre>
                </StyledDiv>

                )}
                <StyledModal
                    open={this.state.isOpenModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div onSubmit={this.addTrack} className="modalAddProject">
                        <div className="titleTimeEntry">
                            <button className="closeTaskBtn" onClick={this.handleClickModal}>X</button>
                        </div>
                        <FormGroup className="formContainerPro" >
                            <div className="formGroup" style={{ display: 'flex', margin: '10px', padding: '10px' }}>
                                <div className="formContainerPro" style={{ width: '50%' }}>
                                    <FormControl className="taskInput">
                                        <InputLabel htmlFor="my-input">Song Title</InputLabel>
                                        <StyledInput
                                            fullWidth
                                            standard
                                            id="my-input"
                                            aria-describedby="my-helper-text"
                                            value={this.state.title}
                                            onChange={e => {
                                                this.setState({ title: e.target.value })
                                            }}
                                            name="title"
                                        />
                                    </FormControl>
                                    <FormControl className="taskInput">
                                        <InputLabel htmlFor="my-input">Artist Name</InputLabel>
                                        <StyledInput
                                            fullWidth
                                            id="my-input"
                                            aria-describedby="my-helper-text"
                                            value={this.state.artist}
                                            onChange={e => {
                                                this.setState({ artist: e.target.value })
                                            }}
                                            name="artist"
                                        />
                                    </FormControl>
                                    <FormControl className="taskInput">
                                        <InputLabel htmlFor="my-input">Genre</InputLabel>
                                        <StyledInput
                                            fullWidth
                                            id="my-input"
                                            aria-describedby="my-helper-text"
                                            value={this.state.genre}
                                            onChange={e => {
                                                this.setState({ genre: e.target.value })
                                            }}
                                            name="genre"
                                        />
                                    </FormControl>

                                </div>

                            </div>
                            <div className="btns">
                                <div className='btnsEdit'>
                                    {!isLoading && <StyledModalButton className="editBtn" onClick={this.addTrack}>DONE</StyledModalButton>}
                                    {isLoading && <CircularProgress />}
                                    {!isLoading && <StyledModalButton className="editBtn" onClick={this.handleClickModal}>CAMCEL</StyledModalButton>}
                                </div>
                            </div>
                        </FormGroup>
                    </div>
                </StyledModal >
            </StyledFormControl>
        )
    }

}
export default HomePage