const stats = [
  {
    number: "50 000+",
    label: "KITOBLAR",
    description: "Bizda klassikadan tortib zamonaviy bestsellerlargacha bo'lgan barcha mavzular mavjud."
  },
  {
    number: "120+",
    label: "MAMLAKATLAR",
    description: "Foydalanuvchilar butun dunyodan bilim o'rganmoqda va baham ko'rmoqda."
  },
  {
    number: "1 500+",
    label: "MUALLIFLAR",
    description: "Nashriyotlar va mustaqil mualliflar bilan bevosita hamkorlik qilamiz."
  },
  {
    number: "2 mln+",
    label: "YUKLAB OLISHLAR",
    description: "Bizning kitoblarimiz millionlab odamlarning bilim olishiga yordam berdi."
  }
]

const InformationStatistika = () => {
  return (
    <section
      style={{
        width: '100%',
        height: '223px',
        backgroundColor: 'rgba(14, 18, 27, 1)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: '24px',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, rgba(22, 50, 183, 0.15) 0%, #2B75CC 50%, rgba(22, 50, 183, 0.15) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, rgba(22, 50, 183, 0.15) 0%, #2B75CC 50%, rgba(22, 50, 183, 0.15) 100%)' }} />

      <div
        style={{
          width: '1200px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 40px',
        }}
      >
        <div className="grid grid-cols-4 w-full relative">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative px-8 flex flex-col"
              style={{ paddingTop: '24px', paddingBottom: '24px' }}
            >
              {index === 0 && (
                <div style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: '1px',
                  background: 'linear-gradient(180deg, rgba(22, 50, 183, 0.15) 0%, #2B75CC 50%, rgba(22, 50, 183, 0.15) 100%)',
                }} />
              )}
              <div style={{
                position: 'absolute',
                right: 0, top: 0, bottom: 0,
                width: '1px',
                background: 'linear-gradient(180deg, rgba(22, 50, 183, 0.15) 0%, #2B75CC 50%, rgba(22, 50, 183, 0.15) 100%)',
              }} />

              <p style={{
                fontFamily: '"Inter Display", Inter, sans-serif',
                fontWeight: 600,
                fontSize: '48px',
                lineHeight: '56px',
                letterSpacing: '-0.02em',
                color: '#ffffff',
                marginBottom: '20px',
              }}>
                {stat.number}
              </p>

              <p style={{
                fontFamily: '"Inter Display", Inter, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '24px',
                textTransform: 'uppercase',
                color: 'rgba(144, 157, 162, 1)',
                marginBottom: '12px',
              }}>
                {stat.label}
              </p>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                color: 'rgba(90, 98, 117, 1)',
                width: '220px',
              }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InformationStatistika
