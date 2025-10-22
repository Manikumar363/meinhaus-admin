import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const DetailsRow = ({ title, data, Icon, image }) => {
  return (
    <div className="flex gap-2">
      {Icon && (
        <div className="bg-blue-100 rounded-full p-2 w-8 h-8 flex justify-center items-center">
          <Icon className="stroke-blue-400" />
        </div>
      )}
      {image && (
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>JR</AvatarFallback>
        </Avatar>
      )}
      <div className="font-medium">
        <p className="text-[10px] lg:text-xs text-slate-400">{title}</p>
        <p className="text-xs lg:text-sm">{data}</p>
      </div>
    </div>
  );
};

export default DetailsRow;
