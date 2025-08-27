import './CreditCard.css';
import visaImg from '../../assets/images/visa.png';
import masterImg from '../../assets/images/master.png';

const CreditCard = (props) => {
  let cardImg;
  if (props.type === 'Visa') {
    cardImg = visaImg;
  } else {
    cardImg = masterImg;
  }

  const lastFourDigits = props.number.slice(-4);
  const cardNumber = '•••• •••• •••• ' + lastFourDigits;

  const expirationDate =
    props.expirationMonth + '/' + props.expirationYear.toString().slice(2);

  const creditCardStyle = {
    color: props.color,
    backgroundColor: props.bgColor,
  };

  return (
    <div className="CreditCard" style={creditCardStyle}>
      <div style={creditCardStyle} className="CreditCard-container">
        <img className="Card-img" src={cardImg} alt="CreditCard bank" />
        <p className="Card-number">{cardNumber}</p>
        <div className="Info-container">
          <div className="Info-container-top">
            <p>Expires {expirationDate}</p>
            <p>{props.bank}</p>
          </div>
          <p className="Owner">{props.owner}</p>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
