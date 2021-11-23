import "./singleTutorial.css";

const SingleTutorial = (props: any) => {

    return (
        <div className="single-tutorial">
            <h4 className="tutorial-title">{props.title}</h4>
            <p className="tutorial-description">{props.description}</p>
        </div>
    )
};

export default SingleTutorial;