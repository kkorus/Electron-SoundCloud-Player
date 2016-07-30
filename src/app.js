import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ProgressSoundPlayer from './components/ProgressSoundPlayer';
import SC from 'node-soundcloud';
import Loading from 'react-loading';

var client_id = 'YOUR SOUNDCLOUD APP ID';

SC.init({
    id: client_id
});

class Main extends Component {
    constructor(props) {
        super();

        this.state = {
            query: '',
            hasResults: false,
            searchResults: [],
            isLoading: false
        };
    }

    handleTextChange(event) {
        this.setState({
            query: event.target.value
        });
        if (event.key === 'Enter') {
            this.search.call(this);
        }
    }

    search() {
        this.setState({
            isLoading: true
        });

        SC.get('/tracks', {
            q: this.state.query,
            embeddable_by: 'all'
        }, (err, tracks) => {
            if (!err) {
                this.setState({
                    hasResults: true,
                    searchResults: tracks,
                    isLoading: false
                });
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Electron SoundCloud Player</h1>
                <input type="search"
                    onKeyUp={this.handleTextChange.bind(this) }
                    className="search-field"
                    placeholder="Enter song name or artist..." />
                <button className="search-button"
                    onClick={this.search.bind(this) }>Search</button>
                <div className="center">
                    {this.state.isLoading && <Loading type="bars" color="#FFB935" />}
                </div>
                {this.state.hasResults && !this.state.isLoading ?
                    this.renderSearchResults.call(this) :
                    this.renderNoSearchResults.call(this) }
            </div>
        );
    }

}