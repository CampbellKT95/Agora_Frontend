import "./timeline.css"
import SingleTimeline from "../singleTimeline/singleTimeline";

//
import {fakeList} from "./fakeList";
//

const Timeline = () => {
    return (
        <section className="timeline">
            {fakeList.map((item) => {
                return <SingleTimeline title={item.title} content={item.content}
                comments={item.comments} likes={item.likes}
                />
            })}
            <button className="load-more-timeline">More</button>
        </section>
    )
}

export default Timeline;