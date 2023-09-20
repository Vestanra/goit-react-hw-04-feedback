import { Section } from "./Section/Section";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics/Statistics";
import { Notification } from "./Notification/Notification";
import { GlobalStyle } from "./GlobalStyle";
import { Layout } from "./Layout.styled";
import { useState } from "react";

export const App = () => {
  
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const clickHandler = (evt) => setFeedbacks(prevState => {
    return ({ ...prevState, [evt.target.name]:  prevState[evt.target.name]+ 1})
  })
  
  const findSum = () => {
    return (Object.values(feedbacks)).reduce((total, number) => { return total + number }, 0);
  }
  
  const countPositiveFeedbackPercentage = () => {
    return Math.round(feedbacks.good * 100 / total )
  }

    const total = findSum();
    const positiveFeedback = countPositiveFeedbackPercentage();

    return (
    <Layout>
        <Section title="Please leave feedback">
          <FeedbackOptions
            onLeaveFeedback={clickHandler}
            options={Object.keys(feedbacks)}></FeedbackOptions>
          {total > 0 ?
            <Statistics statistics={feedbacks} total={(total)} positive={positiveFeedback}></Statistics> :
            <Notification message="There aren't feedbacks"></Notification>}
        </Section>
        <GlobalStyle/>
    </Layout>
  );
};
