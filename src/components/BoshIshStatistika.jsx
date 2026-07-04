import { motion } from "framer-motion";

const stats = [
  { value: "700+", label: "Ever wondered" },
  { value: "500+", label: "Ever wondered" },
  { value: "2000+", label: "Ever wondered" },
  { value: "500+", label: "Ever wondered" },
];

const BoshIshStatistika = () => {
  return (
    <section className="w-full bg-[#0E121B] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col items-center justify-center py-6 md:h-[81px] border-[rgba(230,233,234,0.25)]
                ${index % 2 === 0 ? 'border-r' : ''}
                ${index < 2 ? 'border-b md:border-b-0' : ''}
                ${index === 1 || index === 2 ? 'md:border-r' : ''}
              `}
            >
              <h2 className="text-white text-[36px] md:text-5xl font-semibold">
                {item.value}
              </h2>
              <p className="text-[rgba(138,145,163,1)] text-sm md:text-base mt-2">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoshIshStatistika;
