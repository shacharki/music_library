
import { Component } from "react"
import { getSongs } from './firebase'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        };
    }

    async componentDidMount() {
        const songsList = await getSongs()
        this.setState({ songs: songsList });
    }
    render() {
        const { songs } = this.state;

        return (
            <div>
                {songs.map(song => <b>
                    {song.title+" "}
                    {song.artist+" "}
                    {song.genre+" "}
                </b>

                )}
                <button className="addBtn">ADD TRACK</button>
            </div>
        )
    }

}
export default HomePage