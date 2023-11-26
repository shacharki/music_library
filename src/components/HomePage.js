import { Component } from "react"
import { getSongs, addSong } from '../stores/appStore'
import { Box, FormControl, FormGroup, Input, InputLabel, CircularProgress, Button } from "@mui/material";
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
`;

let StyledDiv = styled(Box)`
  width: 100%;
  font-size: 1rem;
  margin-bottom:0.5rem;
  margin-left:0.5rem;
`;

let StyledInputNumber = styled(Input)`
  input {
    width: 100%;
    text-align: center;
    margin-top:0.7rem;
  }
`;



let StyledBox = styled(Box)`
  overflow-y: scroll;
  max-height:600px ;
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

            if(!this.state.title||!this.state.artist||!this.state.genre) {
                alert("Please fill in all fields")
                return
            }
            await addSong(this.state.title,this.state.artist,this.state.genre)
            alert("The song has been successfully added")
            this.render()
            this.setState({isOpenModal:false})

        
        } catch(error) {
            alert(error.message)
        }

       
    };


      handleClickModal = () => {
        this.setState({isOpenModal:!this.state.isOpenModal})
    }

    render() {
        const { songs } = this.state;
        const { isLoading } = this.state;

        return (
            <div>
                <button onClick={this.handleClickModal} className="addBtn">ADD TRACK</button>

                {songs.map(song => <b>
                    {song.title+" "}
                    {song.artist+" "}
                    {song.genre+" "}
                </b>

                )}
                <Modal
        open={this.state.isOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div onSubmit={this.addTrack} className="modalAddProject">
          <div className="titleTimeEntry">
            <button className="closeTaskBtn" onClick={this.handleClickModal}>X</button>
          </div>
          <FormGroup className="formContainerPro" >
            <StyledBox sx={{ margin: 1 }}>
              <div className="formGroup" style={{ display: 'flex', margin: '10px' }}>
                <div className="formContainerPro" style={{ width: '50%' }}>
                  <FormControl className="taskInput">
                    <InputLabel htmlFor="my-input">Song Title</InputLabel>
                    <StyledInput
                      fullWidth
                      id="my-input"
                      aria-describedby="my-helper-text"
                      value={this.state.title}
                      onChange={e => {
                        this.setState({ title: e.target.value })
                    }}
                      name="name"
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
                      name="key"
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
                      name="projectTypeKey"
                    />
                  </FormControl>
                </div>
              
              </div>
            </StyledBox>
            <div className="btns">
              <div className='btnsEdit'>
                {!isLoading && <Button  className="editBtn" onClick={this.addTrack}>DONE</Button>}
                {isLoading && <CircularProgress />}
                {!isLoading && <Button className="editBtn" onClick={this.handleClickModal}>CAMCEL</Button>}
              </div>
            </div>
          </FormGroup>
        </div>
      </Modal >
            </div>
        )
    }

}
export default HomePage