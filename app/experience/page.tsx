"use client";

import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { DatePicker } from "@/components/ui/datepicker";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [calendarDate, setCalendarDate] = useState<Date>(
    new Date("05/01/2021")
  );
  const experiences = [
    {
      date: new Date("05/01/2021"),
      endDate: new Date("07/01/2021"),
      position: "Systems Engineer Intern",
      company: "Edgewell Personal Care",
      bulletPoints: [
        "Identified redundancy in cloud system for product database, reducing annual cost by $14000+",
        "Developed internal search and management platform supporting 20,000 queries per second",
        "Implemented new CI/CD testing and version control procedures, increasing testing coverage by 17%",
      ],
      extra: ["Milford, CT"],
    },
    {
      date: new Date("05/01/2022"),
      endDate: new Date("08/01/2022"),
      position: "Software Engineer Intern",
      company: "Meta",
      bulletPoints: [
        "Created API data pipelines serving PyTorch Machine Learning data for content categorization on Facebook and Instagram withstanding 600,000 queries per second",
        "Improved efficiency for calculating machine learning chart visualizations by 350%",
        "Optimized final build module size to 33% of original module size",
        "Created data pipelines from internal machine learning platforms that can handle 600,000 queries per second",
        "Integrated key testing procedures into CI/CD pipeline",
        "Built User Interfaces and Data Visualizations utilizing React, Highcharts, Hack, GraphQL, Relay, and Internal Libraries",
      ],
      extra: ["New York, NY", "Fullstack"],
    },
    {
      date: new Date("09/01/2022"),
      endDate: new Date("05/01/2023"),
      position: "Software Engineer",
      company: "Synchrony Financial",
      bulletPoints: [
        "Implemented and configured email, text, and push notifications for 1,000,000+ accounts",
        "Developed an SDK to quickly test the alerts API within internal applications, leading to a 30% reduction in development time for alert-related tasks",
        "Integrated automated tests for enrollment detection into CI/CD pipeline, improving code coverage by 26%",
      ],
      extra: ["Stamford, CT", "Backend"],
    },
    {
      date: new Date("08/01/2023"),
      endDate: null,
      position: "Software Engineer",
      company: "Walmart",
      bulletPoints: [
        "Product Categorization & Placements for Walmart E-Commerce",
        "Created UI workflows servicing 10,500+ stores internationally",
        "Developed API queries capable of handling 470,000 requests per second",
        "Optimized category editing process, reducing modular processing by 460 requests per month",
        "Created a workspace for supplier product submissions, saving $34,000,000 in labor costs and revenue loss",
      ],
      extra: ["Bentonville, AR", "Fullstack"],
    },
  ];

  const disableUnemployedDates = (date: Date) => {
    return !experiences.some(
      (experience) =>
        date >= experience.date && date <= (experience.endDate ?? date)
    );
  };

  const onNext = () => {
    if (index < experiences.length - 1) {
      setIndex(index + 1);

      const dateOutOfRange = !(
        calendarDate >= experiences[index + 1].date &&
        calendarDate <= (experiences[index + 1].endDate ?? calendarDate)
      );
      if (dateOutOfRange) {
        setCalendarDate(experiences[index + 1].date);
      }
    }
  };

  const onBack = () => {
    if (index > 0) {
      setIndex(index - 1);

      const dateOutOfRange = !(
        calendarDate >= experiences[index - 1].date &&
        calendarDate <= (experiences[index - 1].endDate ?? calendarDate)
      );
      if (dateOutOfRange) {
        setCalendarDate(experiences[index - 1].date);
      }
    }
  };

  useEffect(() => {
    let newIndex: number = 0;

    if (calendarDate < experiences[0].date) {
      setCalendarDate(experiences[0].date);
    } else {
      experiences.forEach(({ date, endDate }, i) => {
        const dateWithinRange =
          calendarDate >= date && calendarDate <= (endDate ?? calendarDate);

        if (dateWithinRange) {
          newIndex = i;
        }
      });
    }

    setIndex(newIndex);
  }, [calendarDate]);

  const renderExperienceDetails = () => {
    const { date, endDate, position, company, bulletPoints, extra } =
      experiences[index];

    return (
      <div className="w-full h-[400px]">
        <h1 className="text-2xl font-normal text-left w-full leading-loose">
          <span className="bg-card p-0.5 px-1 rounded border bg-muted/60 text-muted-foreground font-light whitespace-nowrap">
            {position}
          </span>{" "}
          at{" "}
          <span className="bg-card p-0.5 px-1 rounded border bg-muted/60 text-muted-foreground font-light whitespace-nowrap">
            {company}
          </span>{" "}
          from{" "}
          <span className="bg-card p-0.5 px-1 rounded border bg-muted/60 text-muted-foreground font-light whitespace-nowrap">
            {format(date, "MMMM yyyy")}
          </span>{" "}
          to{" "}
          <span className="bg-card p-0.5 px-1 rounded border bg-muted/60 text-muted-foreground font-light whitespace-nowrap">
            {endDate ? format(endDate, "MMMM yyyy") : "today"}
          </span>
        </h1>
        <Separator className="mt-1 mb-4" />
        <div className="inline-flex gap-4">
          <div className="w-1/4">
            <h2 className="text-xl font-medium text-left w-full">Etc.</h2>
            <Separator className="my-2" />
            <ul className="flex flex-col gap-2 text-base">
              {extra.map((extra, index) => (
                <li key={index}>
                  <span className="bg-card p-0.5 px-1 rounded border bg-muted/60 text-muted-foreground font-light whitespace-nowrap">
                    {extra}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/4">
            <h2 className="text-xl font-medium text-left w-full">Notables</h2>
            <Separator className="my-2" />
            <ul className="flex flex-col gap-2 text-base">
              {bulletPoints.map((bulletPoint, index) => (
                <li key={index} className="inline-flex gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{bulletPoint}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col w-full h-full max-w-[800px] items-center text-sm">
        <h1 className="text-4xl font-medium w-full text-left mt-32">
          Where was Van on{"  "}
          <span className="bg-card p-0.5 px-1 rounded border bg-muted/60 text-muted-foreground font-light whitespace-nowrap">
            {format(calendarDate, "PPP")}
          </span>
          ?
        </h1>
        <Separator className="my-4 mb-12" />

        {renderExperienceDetails()}
        <div className="inline-flex w-full justify-between mt-8 mb-4">
          <Button
            variant={"outline"}
            size={"sm"}
            className="inline-flex gap-1"
            onClick={onBack}
          >
            <FaArrowLeft /> Back
          </Button>
          <DatePicker
            date={calendarDate}
            setDate={setCalendarDate}
            disabled={disableUnemployedDates}
          />
          <Button
            variant={"outline"}
            size={"sm"}
            className="inline-flex gap-1"
            onClick={onNext}
          >
            Next <FaArrowRight />
          </Button>
        </div>
        <Progress value={((index + 1) / experiences.length) * 100} />
      </div>
    </main>
  );
}
