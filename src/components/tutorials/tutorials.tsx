import "./tutorials.css";
import SingleTutorial from "../singleTutorial/singleTutorial";

import {fakeList} from "./fakeList";

const Tutorials = () => {

    return (
        <div className="tutorials">

            <h1 className="tutorials-title">Tutorials</h1>

            <section className="tutorials-container">
                {fakeList.map((tutorial) => {
                    return <SingleTutorial title={tutorial.title} 
                    description={tutorial.description} key={tutorial.id}/>
                })}
                <h4 className="more-tutorials">...</h4>
            </section>

        </div>
    )
}

export default Tutorials