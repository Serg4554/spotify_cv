
export default [
  {
    section: "Desktop",
    projects: [
      {
        id: 1,
        title: "Bibliometro",
        image: "/images/projects/bibliometro.png",
        description: "I was responsible for the negotiation, design and implementation of the software installed in all Bibliometro modules (a service of loan and return books in the subway of Madrid, Spain).\n" +
          "This software, which is used by a large amount of people every day, allows the automatic return of books 24/7 and consult the catalog in a very simple way through a painstakingly developed interface."
      },
      {
        id: 2,
        title: "LibraryRFID (SDK)",
        image: "/images/projects/libraryrfid.png",
        description: "Spoiler: This project allowed a startup to expand internationally!\n" +
          "I developed a library and provided an SDK to manage RFID tags in a very simple way, standardizing communications with any reader and providing a layer of abstraction over different RFID tag formats.\n" +
          "This allows to develop applications that interact with RFID tags very quickly, without knowing the encoding of formats and compatible with each time more readers."
      },
      {
        id: 3,
        title: "Staff / Conversion",
        image: "/images/projects/staff_conversion_station.png",
        description: "Spoiler: This software has been acquired by one of the largest RFID solutions companies in Europe and is expected to be used soon in 99% of libraries in the Netherlands and Belgium.\n" +
          "Inventory systems are usually proprietary software and/or compatible with a limited number of RFID readers, but this software allows you to hack any system and integrate any other reader (you can even use Whatsapp as an inventory system!)\n" +
          "In addition, it allows to replace the old barcodes system by RFID tags (in any format) in a very simple way."
      },
      {
        id: 4,
        title: "RFID Tools",
        image: "/images/projects/rfidtools.png",
        description: "This program provides very useful tools for RFID tags, such as fixing writing failures or mass encoding a list of items to be written in tags (used in a factory).\n" +
          "This software has also been used to fix 2.500.000 RFID tags that wasn't correctly written, turning an economic disaster into a simple scare."
      },
    ]
  },
  {
    section: "Web",
    projects: [
      {
        id: 5,
        title: "QPlan it!",
        image: "/images/projects/qplanit.png",
        description: "It's a very easy to use scheduling tool that aims to solve the shortcomings of solutions such as Doodle, providing greater flexibility to organize events and allowing participants to choose time frames within the limits set by the creator of the event.\n" +
          "I developed this web application for my final degree project and allowed me to graduate with honors. It is still not ready for production, but you can check it out visiting qplan.it (the source code is available in Github)."
      },
      {
        id: 6,
        title: "Wikiuma",
        image: "/images/projects/wikiuma.png",
        description: "It’s a project which began some years ago with the goal of providing every student in my university of a database about professors and subjects, so they can choose and rate them in order to help choose the best way to learn and develop their skills.\n" +
          "This goal was completely reached until the point of having been published in newspapers and having thousands of unique visits every month."
      },
      {
        id: 7,
        title: "ID Manager",
        image: "/images/projects/idmanager.png",
        description: "It’s an inventory management system initially designed for libraries (currently it’s expanding to other markets). It offers an API so that any device can send the inventory wirelessly and allows managing huge quantities of items, detecting those that are missing, misplaced, creating search lists, etc. in a very simple way.\n" +
          "This software has been installed in many libraries throughout Europe, thanks to the acquisition of large library solutions companies, and currently manages a database of millions of books."
      }
    ]
  },
  {
    section: "Mobile",
    projects: [
      {
        id: 8,
        title: "ID Scan (Android)",
        image: "/images/projects/idscan_android.png",
        description: "It’s a very rich in features application that I have developed to perform inventories, providing functions such as the warning of misplaced items, badly written tags, items you are looking for, etc. while doing the inventory.\n" +
          "It also allows the synchronization with the inventory server, facilitating the parallel work of hundreds or thousands of people.\n" +
          "And most incredible, it also works with any mobile with NFC! Not only expensive handheld devices!"
      },
      {
        id: 9,
        title: "ID Scan (Windows CE)",
        image: "/images/projects/idscan_windows.png",
        description: "Honestly, I didn’t expect you to get here with the amount of resumes that you have to read! If it's been like that, I think at least I deserve a call, right? :P\n" +
          "As for the application, it’s the same application that I have developed for Android, but in Windows CE (a system that is widely used in handheld devices)"
      }
    ]
  }
]