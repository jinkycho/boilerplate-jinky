import type { NextPage } from "next";

import styled from "styled-components";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { Calendar } from "@fullcalendar/core";

const Home: NextPage = () => {
  const events = [
    {
      title: "이번주 시작",
      start: "2021-12-20T10:00:00",
    },
    {
      title: "스튜디오 메이트 클론 코딩",
      start: "2021-12-20T10:00:00",
      allday: true,
    },
    {
      title: "event3",
      start: "2021-12-31T12:30:00",
      allDay: false, // will make the time show
    },
  ];

  // const Calendar = styled.div``;
  return (
    <div>
      <FullCalendar
        locale="ko"
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          resourceTimelinePlugin,
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title",
          center: "prev today next",
          right: "dayGridMonth,timeGridWeek,timeGridDay,resourceTimeline",
        }}
        buttonText={{
          today: "오늘",
          dayGridMonth: "월간",
          timeGridWeek: "주간",
          timeGridDay: "일간",
          resourceTimeline: "일간(강사별)",
        }}
        events={{ events }}
        editable
        nowIndicator
      />
    </div>
  );
};

export default Home;
