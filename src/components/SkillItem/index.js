import './index.css'

const SkillItem = props => {
  const {each} = props
  const {name, imageUrl} = each

  return (
    <li className="skill-cont">
      <img src={imageUrl} alt={name} className="skill-image" />
      <h1 className="skill-item-head">{name}</h1>
    </li>
  )
}

export default SkillItem
