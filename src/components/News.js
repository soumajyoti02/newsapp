import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = [
        {
            "source": {
                "id": null,
                "name": "CBS Sports"
            },
            "author": "",
            "title": "2023 NFL Mock Draft: Anthony Richardson continues move up board, other combine standouts catapult into Round 1 - CBS Sports",
            "description": "There are some new names in the first round",
            "url": "https://www.cbssports.com/nfl/draft/news/2023-nfl-mock-draft-anthony-richardson-continues-move-up-board-other-combine-standouts-catapult-into-round-1/",
            "urlToImage": "https://sportshub.cbsistatic.com/i/r/2023/03/05/30efc159-5ad4-4922-9ee4-7db9288292d1/thumbnail/1200x675/1b398314aab0d97e179213ae36407a29/anthony-richardson.jpg",
            "publishedAt": "2023-03-07T14:49:00Z",
            "content": "The 2023 NFL Combine is all but over, and it was a great week for a lot of players. If you need a quick refresher, we fired up the ol' \"With the First Pick\" podcast machine every day to recap the act… [+1015 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "NBCSports.com"
            },
            "author": "Mike Florio",
            "title": "Report: Aaron Rodgers spoke to Jets on Monday - ProFootballTalk - NBC Sports",
            "description": "As potential Jets quarterback Derek Carr was signing instead with the Saints on Monday, current Packers quarterback Aaron Rodgers reportedly was talking with the Jets.Just after midnight, former ESPN host Trey Wingo dropped this nugget on Twitter: “Per source…",
            "url": "https://profootballtalk.nbcsports.com/2023/03/07/report-aaron-rodgers-spoke-to-jets-on-monday/",
            "urlToImage": "https://profootballtalk.nbcsports.com/wp-content/uploads/sites/25/2023/03/GettyImages-1244067485-e1678198654357.jpg",
            "publishedAt": "2023-03-07T14:18:00Z",
            "content": "As potential Jets quarterback Derek Carr was signing instead with the Saints on Monday, current Packers quarterback Aaron Rodgers reportedly was talking with the Jets.\r\nJust after midnight, former ES… [+1032 chars]"
        }
    ]

    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false
        }
    }

    render() {
        return (
            <div className="container my-5">
                <h2>NewsMonkey - Top Headings</h2>

                <div className="row my-3" >
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title.slice(0, 40)} description={element.description.slice(0, 85)} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default News
