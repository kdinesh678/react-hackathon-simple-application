import React from 'react';
import {mount} from 'enzyme';
import { IdeasPage } from './ideas-page';
import { getAllIdeas, updateIdea } from "../../external/external-proxy";
import {Menu} from '@mui/material';

jest.mock("../../external/external-proxy");

const mockIdeas = [
    {
      ideaId: "1",
      title: "Use JavaScript to Create a Game",
      description:
        "You will use your JavaScript knowledge to create a simple and enjoyable game. There are many games available on the internet that were built through HTML5 and JavaScript. You can start by creating a simple snake game where the player controls the snake and earns a point whenever the snake eats a fruit. The player loses if the snake hits the border (or an obstacle). \nOn the other hand, you can create an advanced game that stands out from the competition, such as a platformer (like Mario) or a puzzle-solving game.  ",
      createdBy: "empId",
      createdDate: "2021-10-11",
      votes: 1,
      isActive: true,
      tags: ["feature", "tech"],
    },
    {
      ideaId: "2",
      title: "A Tool that Generates Weather Reports",
      description:
        "Here, you’ll be creating a tool that generates weather reports for the user. It is among the best hackathon projects for beginners as the prerequisites for this project are pretty simple. You only need to be familiar with advanced web-development and APIs (Application Programming Interfaces) to work on this project.\nFirst, you’ll have to create a website with an easy-to-use interface. Then, you’ll have to use a weather API that will provide you with the required weather information. Your website would receive the API data and show the same in a proper and easy to understand manner.\nYou can use OpenWeatherMap API, Weatherbit API, or AccuWeather API for this project. ",
      createdBy: "empId",
      createdDate: "2021-11-11",
      votes: 10,
      isActive: true,
      tags: ["feature", "tech"],
    },
  ];

getAllIdeas.mockReturnValue(()=> [...mockIdeas]);

describe('Ideas Page',()=>{
    let wrapper, goToCreatePage = jest.fn();

    beforeEach(()=>{
        jest.spyOn(Menu, 'render').mockImplementation((props)=>props.open?<div>{props.children}</div>: null);
        wrapper = mount(<IdeasPage goToCreatePage={goToCreatePage}/>)
    });

    it('should display all the ideas on this page',()=>{
        expect(wrapper.find('div.idea-container').length).toEqual(2);
    });

    it('should add the collapsed class to each idea by default',()=>{
        expect(wrapper.find('div.idea-container.collapsed').length).toEqual(2);
    });

    it('should remove the collapsed class when an idea is clicked',()=>{
        const ideaContainer = wrapper.find('div.idea-container').at(0);
        ideaContainer.simulate('click', {currentTarget: {getAttribute: ()=>"1"}});

        const updatedContainer = wrapper.find('div.idea-container').at(0);
        expect(updatedContainer.hasClass('collapsed')).toEqual(false);
    });

    it('should sort the list by created date',()=>{
        const firstIdea = wrapper.find('div.idea-container').at(0).prop('id');
        const secondIdea = wrapper.find('div.idea-container').at(1).prop('id');

        const sortButton =  wrapper.find('button[data-test-marker="button--sort"]');
        sortButton.simulate('click', {currentTarget: sortButton.getDOMNode()});

        wrapper.find('li[data-test-marker="sort--most-recent"]').simulate('click');
        wrapper.update();

        const updatedFirstIdea = wrapper.find('div.idea-container').at(0).prop('id');
        const updatedSecondIdea = wrapper.find('div.idea-container').at(1).prop('id');

        expect(firstIdea).toEqual("1");
        expect(updatedFirstIdea).toEqual("2");
        expect(secondIdea).toEqual("2");
        expect(updatedSecondIdea).toEqual("1");

    });

    it('should sort the list by number of votes',()=>{
        const firstIdea = wrapper.find('div.idea-container').at(0).prop('id');
        const secondIdea = wrapper.find('div.idea-container').at(1).prop('id');

        const sortButton =  wrapper.find('button[data-test-marker="button--sort"]');
        sortButton.simulate('click', {currentTarget: sortButton.getDOMNode()});

        wrapper.find('li[data-test-marker="sort--most-voted"]').simulate('click');
        wrapper.update();

        const updatedFirstIdea = wrapper.find('div.idea-container').at(0).prop('id');
        const updatedSecondIdea = wrapper.find('div.idea-container').at(1).prop('id');

        expect(firstIdea).toEqual("1");
        expect(updatedFirstIdea).toEqual("2");
        expect(secondIdea).toEqual("2");
        expect(updatedSecondIdea).toEqual("1");
    });

    it('should open the create page when clicked on add new idea button',()=>{
        wrapper.find('button[data-test-marker="button--add-new-idea"]').simulate('click');
        expect(goToCreatePage).toHaveBeenCalled();
    });

    it('should invoke the function to upvote the idea when the vote button is clicked',()=>{
        wrapper.find('div.idea-container').at(0).find('.votes').simulate('click', {currentTarget: {getAttribute: ()=>"1"}});

        expect(updateIdea).toHaveBeenCalledWith({...mockIdeas[0], votes: mockIdeas[0].votes+1});
    });
});