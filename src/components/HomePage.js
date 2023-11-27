import { Component } from "react"
import { getSongs, addSong } from '../stores/appStore'
import { FormControl, FormGroup,Box, Input, InputLabel, CircularProgress, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import './HomePage.css'

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

let StyledButton = styled.button`
  background-color: #5a2cff;
  font-size: 0.8rem;
  color: white;
  border: #5a2cff 1px solid;
  box-shadow: 0 0 1px 1px rgb(138, 137, 137);
  padding: 1rem;
  margin-right:2rem;
  border-radius: 1rem;
  font-weight: bold;
  width: 10rem;
  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    margin-top: 1.5rem;
    border-radius: 0rem;
    box-shadow: 0 0 0 0;
    margin-right:0rem;
  }
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
        this.setState({ isLoading: true })
        const songsList = await getSongs()
        this.setState({
            songs: songsList,
            isLoading: false
        });
    }

    addTrack = async () => {
        try {

            if (!this.state.title || !this.state.artist || !this.state.genre) {
                alert("Please fill in all fields")
                return
            }
            this.setState({ isLoading: true })
            await addSong(this.state.title, this.state.artist, this.state.genre)
            this.componentDidMount()
            this.setState({
                isLoading: false,
                isOpenModal: false,
                title: "",
                artist: "",
                genre: "",
            })


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
                <div className="styledHeader">
                    <div className="HeaderText">
                        {"Mini Music Library Web Application"}
                    </div>
                    <StyledButton onClick={this.handleClickModal}>{"ADD TRACK"}</StyledButton>
                </div>

                {!isLoading &&
                <div className="styledSongs">
                 {songs.map(song =>
                    <Box className="styledBox">
                        <div className="styledSong">
                            <div className="styledTitle">{song.title}</div>
                            <div className="styledArtist">{song.artist}</div>
                        </div>
                        <div className="styledDivGenre">
                            <div className="styledArtist">{song.genre.toUpperCase()}</div>
                        </div>
                    </Box>
                )}</div>}
                

                <Modal
                    open={this.state.isOpenModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div onSubmit={this.addTrack} className="modalAddTarck">
                        <div className="titleTimeEntry">
                            <button className="closeTaskBtn" onClick={this.handleClickModal}>X</button>
                        </div>
                        <FormGroup className="formContainerPro" >
                            <div className="formGroup" style={{ display: 'flex', margin: '10px', padding: '10px' }}>
                                <div className="formContainerPro" style={{ width: '50%' }}>
                                    <FormControl className="trackInput" >
                                        <InputLabel htmlFor="my-input">Song Title</InputLabel>
                                        <StyledInput
                                            fullWidth
                                            id="my-input"
                                            aria-describedby="my-helper-text"
                                            value={this.state.title}
                                            onChange={e => {
                                                this.setState({ title: e.target.value })
                                            }}
                                            name="title"
                                        />
                                    </FormControl>
                                    <FormControl className="trackInput" style={{ marginTop: '2rem' }}>
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
                                    <FormControl className="trackInput" style={{ marginTop: '2rem' }}>
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
                                    {!isLoading && <Button onClick={this.addTrack}>DONE</Button>}
                                    {isLoading && <CircularProgress />}
                                    {!isLoading && <Button onClick={this.handleClickModal}>CANCEL</Button>}
                                </div>
                            </div>
                        </FormGroup>
                    </div>
                </Modal >
            </StyledFormControl>
        )
    }

}
export default HomePage