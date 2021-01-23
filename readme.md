
# LearnIt ReadMe
1. [Reusable Components](#Reusable-components)
    * [ErrorMessage](#ErroMessage)
    * [SlideScreen](#SlideScreen)
    * [WordForm](#WordForm)


\
\
\
\
~

# Reusable components

## ErrorMessage
**message** *String*  

```javascript
import ErrorMessage from 'components/ErrorMessage';

<ErrorMessage message="Something went wrong" />
```
~

## SlideScreen

```javascript
import SlideScreen from 'components/SlideScreen'
import { toggleSlide } from 'actions/utils'

<Button title="close" onPress={toggleSlide}>

<SlideScreen>
    <ComponentToBeSlided />
</SlideScreen>
```
~

## EditForm
**headerText** *String* <br>
**buttonText** *String* <br>
**firstPlaceholder** *String* <br>
**secondPlaceholder** *String* <br>


```javascript
import WordForm from 'components/WordForm'

<WordForm />
```
\
\
\
\
~



