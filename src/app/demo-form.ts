import { Class, FIELD_FORM_CONTROL_TOKEN, FIELD_PARENT_CONTROL_TOKEN, Form, FORM_SUBMIT_TOKEN, Group, GroupComponent, Provide } from 'ng-deco-forms';
import { Action, BtnClass, Checkbox, CheckLabel, Half, Hidden, Hide, Hint, Label, Min, Number, OnSubmit, Options, Required, Row, Select, Step, SubmitComponent, Text, Textarea, Title, Tooltip, TwoThirds, Warn } from 'ng-deco-forms-bootstrap'
import { inject } from '@angular/core';
import { startWith, map } from 'rxjs';

const WHO_MADE = [
    {
      id: 'i_did',
      name: 'I did',
    },
    {
      id: 'he_did',
      name: 'He did',
    }
  ];
  
  const WHEN_MADE = [
    {
      id: 'last_week',
      name: 'Last Week',
    },
    {
      id: 'today',
      name: 'Today',
    }
  ];
  
  const IS_SUPPLY = [
    {
      id: 'no',
      name: 'No',
    },
    {
      id: 'yes',
      name: 'Yes',
    }
  ];
  
  class MarketAttributes {
  
    @Required 
    @Label('Who Made') @Options(WHO_MADE)
    @Select()
    who_made = null;
  
    @Required 
    @Label('When Made') @Options(WHEN_MADE)
    @Select()
    when_made = null;
  
    @Required 
    @Label('What Is It') @Options(IS_SUPPLY)
    @Select()
    is_supply = null;
  }
  
  class PersonalizationInstructions {
    @Label('Personalization Message')
    @Textarea()
    personalization_instructions = "";
  
    @CheckLabel('Personalization Required')
    @Checkbox
    personalization_is_required = false;
  }
  
  const hidePersonalization = () => { 
    const personalization = inject(FIELD_PARENT_CONTROL_TOKEN).get('is_personalizable');
    return personalization.valueChanges.pipe(
      startWith(personalization.value),
      map(v => !v));
    }
  
  class Personalization {
    @CheckLabel('Personalization')
    @Checkbox
    is_personalizable = false;
  
    @Hide(hidePersonalization)
    @Group()
    instructions: PersonalizationInstructions = new PersonalizationInstructions()
  }
  
  const multiplyWarning = "Warning: multiplying by more than 2";
  const multiplyWarningFunc = () => inject(FIELD_FORM_CONTROL_TOKEN).valueChanges.pipe(
    map(
      (value: number) => value > 2 ? multiplyWarning : null
    )
  )
  const additionWarning = "Warning: adding more than 1000";
  const additionWarningFunc = () => inject(FIELD_FORM_CONTROL_TOKEN).valueChanges.pipe(
    map(
      (value: number) => value > 1000 ? additionWarning : null
    )
  )
  class Price {
  
    @Warn(additionWarningFunc)
    @Tooltip("Use 0 for no change")
    @Label("Add to price")
    @Number()
    price_addition = 0;
  
    @Warn(multiplyWarningFunc)
    @Tooltip("Use 1 for no change")
    @Label("Multiply price by")
    @Min(0)
    @Step(0.1)
    @Number()
    price_multiplier = 1;
  }
  
  const titleWarning = "Warning: no %title% modifier";
  const titleWarningFunc = () => inject(FIELD_FORM_CONTROL_TOKEN).valueChanges.pipe(
    map(
      (value: string) => !value.includes("%title%") ? titleWarning : null
    )
  )
  const titleHint = "Modifiers: %title% %categories% %tags% %sku%";
  const descriptionWarning = "Warning: no %description% modifier";
  const descriptionWarningFunc = () => inject(FIELD_FORM_CONTROL_TOKEN).valueChanges.pipe(
    map(
      (value: string) => !value.includes("%description%") ? titleWarning : null
    )
  )
  const descriptionHint = "Modifiers: %description% %excerpt% %title% %categories% %tags% %sku% and more";
  const tagsHint = "Comma seperated list of tags";
  const materialsHint = "Comma seperated list of materials";
  
  const descriptionTooltip = "Modifiers will be replaced by actual content";
  const titleTooltip = "Modifiers will be replaced by actual content";
  const tagsTooltip = "These will be appended to your product tags";
  const submit = () => {
    const form = inject(FIELD_FORM_CONTROL_TOKEN);
    return () => {
      console.log(form.value);
    }
  }

  @BtnClass('btn-success')
  @Action('Submit')
  @OnSubmit(submit)
  @Form(SubmitComponent)
  export class DemoForm  {
    
    constructor() {
  
    }
  
    @Hidden
    id: string | null = null;
  
    @Label('Template Name')  @Half @Text
    name = "";
    
  
    @Required @Hint(titleHint) @Tooltip(titleTooltip)
    @Warn(titleWarningFunc) @Label('Title Template') @Text
    title = "%title%";
  
    // @Warn((value: string) => !value.includes("%title%"), descriptionWarning)
    @Hint(descriptionHint)
    @Tooltip(descriptionTooltip)
    @Required
    @Warn(descriptionWarningFunc)
    @Label('Description Template')
    @Textarea()
    description = "%description%";
  
    @Hint(tagsHint)
    @Tooltip(tagsTooltip)
    @Label('Tags')
    @Text
    tags = "";
  
    @Hint(materialsHint)
    @Label('Materials')
    @Text
    materials = "";
  
    @Title('Personalization')
    @Group()
    personalization: Personalization = new Personalization()
    
    @Title('Market Attributes') @TwoThirds
    @Row @Group()
    market_attributes = new MarketAttributes();
  
  
    @Title('Price')
    @Half @Row @Group()
    price = new Price();
    
  }