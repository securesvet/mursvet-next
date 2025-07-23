export type CardProps = {
  href: string;
  image: string;
  name: string;
  description: string;
  githubUrl?: string;
  children?: React.ReactNode;
};
const Card = ({ href, image, name, description, children }: CardProps) => {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl shadow-lg hover:shadow-[0px_0px_15px_15px_rgba(0,0,0,0.1)] transition-shadow duration-300 p-1">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover rounded-2xl transition-opacity hover:opacity-80"
        />
      </a>
      <div className="p-5 text-white text-center">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-300">{description}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;
