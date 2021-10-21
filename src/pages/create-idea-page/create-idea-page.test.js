import React from 'react';
import { shallow } from 'enzyme';
import { CreateIdeasPage } from './create-idea-page';
import { addNewIdea } from '../../external/external-proxy';
jest.mock('../../external/external-proxy');

describe('Create Idea Page',()=>{
  let wrapper;
  let goBack = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<CreateIdeasPage goBack={goBack}/>);
    goBack.mockReset();
    addNewIdea.mockReset();
  });

  it('should keep the save button disabled if required information are not entered',()=>{
    const saveButton = wrapper.find('[data-test-marker="button--create-idea"]');
    
    expect(saveButton.props().disabled).toEqual(true);

    saveButton.simulate('click');
    expect(goBack).not.toHaveBeenCalled();
    expect(addNewIdea).not.toHaveBeenCalled();
  });

  it('should save the changes in title field in state',()=>{
      const titleField = wrapper.find('[data-test-marker="text-field--title"]');
      titleField.simulate('change',{target:{value: 'New Idea'}});

      expect(wrapper.find('[data-test-marker="text-field--title"]').prop("value")).toEqual('New Idea');
  });

  it('should save the changes in description field in state',()=>{
    const descriptionField = wrapper.find('[data-test-marker="text-field--description"]');
    descriptionField.simulate('change',{target:{value: 'New Idea Details'}});

    expect(wrapper.find('[data-test-marker="text-field--description"]').prop("value")).toEqual('New Idea Details');
  });

  it('should save the changes in tag field in state',()=>{
    const tagField = wrapper.find('[data-test-marker="text-field--tag"]').at(0);
    
    expect(tagField.prop("variant")).toEqual("outlined");
    tagField.simulate('click', {currentTarget: { getAttribute: ()=> 'feature'}});

    const updatedTagField = wrapper.find('[data-test-marker="text-field--tag"]').at(0);
    expect(updatedTagField.prop("variant")).toEqual("");
  });

  it('should invoke addNewIdea when all the fields are entered',()=>{
    wrapper.find('[data-test-marker="text-field--title"]').simulate('change',{target:{value: 'New Idea'}});
    wrapper.find('[data-test-marker="text-field--description"]').simulate('change',{target:{value: 'New Idea Details'}});
    wrapper.find('[data-test-marker="text-field--tag"]').at(0).simulate('click', {currentTarget: { getAttribute: ()=> 'feature'}});

    wrapper.find('[data-test-marker="button--create-idea"]').simulate('click');
    
    expect(goBack).toHaveBeenCalled();
    expect(addNewIdea).toHaveBeenCalledWith({title: 'New Idea', description: 'New Idea Details', tags: ['feature']});
  });
});