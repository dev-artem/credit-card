import React from 'react'
import './card.scss'


const Card: React.FC<{}> = () => {

    const _card: string = '1111 2222 3333 4444';
    const _date: string = '07/2021';
    const _cvv: string = '123';

    const numberFormat = (e: any) => {
        e.target.value = e.target.value.replace(/\s/g, "").match(/[0-9]{1,4}/g)?.join(' ').substr(0, 19) || ''
    }

    const dateFormat = (e: any) => {
        e.target.value = e.target.value.replace(/[а-яА-Яa-zA-Z]/g, '').replace(/^([0-9]{2})([\d]{1,4})$/, '$1/$2').substr(0, 7) || ''
        let date: string = e.target.value
        if(date.length >= 7){
            let test: Array<string> = date.split('/')
            if(Number.parseInt(test[0]) > 12 || Number.parseInt(test[0]) < 1) test[0] = '12';
            if(Number.parseInt(test[1]) < 2020 || Number.parseInt(test[1]) > 2050) test[1] = '2020';
            e.target.value = test.join('/');
        }
    }

    const cvvFormat = (e: any) => {
        e.target.value = e.target.value.replace(/\s/g, '').match(/.{1,3}/g)?.join('').substr(0, 3) || ''
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        const { number, date, cvv } = e.target;

        let numberCheck: boolean = validation(number.value, 16, /\s/g)
        let dateCheck: boolean = validation(date.value, 6, /\//g)
        let cvvCheck: boolean = validation(cvv.value, 3)

        errorHandler(number, numberCheck)
        errorHandler(date, dateCheck)
        errorHandler(cvv, cvvCheck)

        if(numberCheck && dateCheck && cvvCheck){
            if(number.value === _card && date.value === _date && cvv.value === _cvv){
                window.alert('Успешно')
                return
            }
            window.alert('Такой кредитной карты не существует')
        }
    }

    return (
        <div className="wrap">
            <form onSubmit={submitHandler} className="card">
                <div className="card__group">
                    <div>Номер карты:</div>
                    <input onInput={numberFormat} type="tel" className="card__number" placeholder="0000 0000 0000 0000" name="number"  />
                    <div className="card__invalid hidden">Введите корректный номер карты</div>
                </div>
                <div className="card__group">
                    <div>Действительна до:</div>
                    <input onInput={dateFormat} type="tel" className="card__date" placeholder="ММ / ГГГГ"  name="date"/>
                    <div className="card__invalid hidden">Введите дату от 01/2020 до 12/2050</div>
                </div>
                <div className="card__group">
                    <div>CVV2:</div>
                    <input onInput={cvvFormat} type="number" className="card__cvv" placeholder="000" name="cvv" />
                    <div className="card__invalid hidden">Введите корректный CVV2</div>
                </div>
                <div className="card__group">
                    <button className="card__submit">Подтвердить</button>
                </div>
            </form>
            <div className="info">
                <h2>Валидные данные:</h2>
                    <div><h4>Номер карты: </h4><p>1111 2222 3333 4444</p></div>

                    <div><h4>Дата: </h4><p>07/2021</p></div>

                    <div><h4>CVV2: </h4><p>123</p></div>
            </div>
        </div>
    )
}

function validation(data: string, length: number, regex: RegExp = /\s/): boolean{
    let check: string = data.replace(regex, '')
    if(check.length !== length) return false;
    return true
}

function errorHandler(el: HTMLAnchorElement, result: boolean): void{
    console.dir(el.nextElementSibling)
    if(!result){
        el.nextElementSibling?.classList.remove('hidden')
    } else {
        el.nextElementSibling?.classList.add('hidden')
    }
}

export default Card;


