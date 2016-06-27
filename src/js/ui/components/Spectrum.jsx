'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const Application = require('../../core/Application.js');
const SpectrumParser = require('../../audio/SpectrumParser.js');
const BarDisplay = require('../../display/BarDisplay.js');
const autoBind = require('../../util/autoBind.js');

class Spectrum extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        
        this.state = {
            smoothingTimeConstant: 0.5,
            minDecibels: -60,
            maxDecibels: -12,
            minFrequency: 0,
            maxFrequency: 10000,
            fftSize: 1024,
            sampleRate: 44100,
            binSize: 32,
            normalize: false
        };
    }

    componentWillMount() {
        this.config = {
            width: 854,
            height: 100,
            barWidth: -1,
            barSpacing: 1,
            shadowHeight: 0,
            color: '#775fd8'
        };
    }

    componentDidMount() {
        this.bars = new BarDisplay(
            ReactDOM.findDOMNode(this.refs.canvas),
            this.config
        );

        this.parser = new SpectrumParser(this.state);

        Application.on('render', function(data) {
            let fft = this.parser.parseFFT(data.fft);

            this.bars.render(fft);
        }, this);
    }

    shouldComponentUpdate() {
        return false;
    }

    handleClick() {
        this.setState({ normalize: !this.state.normalize }, () => {
            this.parser.update(this.state);
        });
    }

    render() {
        return (
            <div className="spectrum">
                <canvas ref="canvas" className="canvas" width="854" height="100" onClick={this.handleClick} />
            </div>
        );
    }
}

module.exports = Spectrum;