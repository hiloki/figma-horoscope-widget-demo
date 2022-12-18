// This is a counter widget with buttons to increment and decrement the number.
import { PlaceholderImage, Aquarius, Aries, Cancer, Capricorn, Gemini, Leo, Libra, Pisces, Sagittarius, Scorpio, Taurus, Virgo } from "./images";

const { widget } = figma;
const { useSyncedState, usePropertyMenu, AutoLayout, Fragment, Text, Span, SVG, waitForTask } = widget;

const CONTAINER_COLOR = "#FFFFFF";
const HEADER_COLOR = "#FCE1BC";
const TEXT_COLOR = "#37143B";
const EMPHASIS_TEXT_COLOR = "#CF4720";
const GRAY_TEXT_COLOR = "#676767";
const FETCH_URL = "https://aztro.sameerkumar.website/?day=today";

const options = {
  method: "POST",
};

function Widget() {
  const [currentDate, setCurrentDate] = useSyncedState<string>("currentDate", "");
  const [description, setDescription] = useSyncedState<string>("description", "");
  const [sign, setSign] = useSyncedState<string>("sign", "");
  const signOptions = [
    { option: "", label: "Choose your sign" },
    { option: "aries", label: "Aries" },
    { option: "taurus", label: "Taurus" },
    { option: "gemini", label: "Gemini" },
    { option: "cancer", label: "Cancer" },
    { option: "leo", label: "Leo" },
    { option: "virgo", label: "Virgo" },
    { option: "libra", label: "Libra" },
    { option: "scorpio", label: "Scorpio" },
    { option: "sagittarius", label: "Sagittarius" },
    { option: "capricorn", label: "Capricorn" },
    { option: "aquarius", label: "Aquarius" },
    { option: "pisces", label: "Pisces" },
  ];

  function getSign(sign: string) {
    return fetch(`${FETCH_URL}&sign=${sign}`, options)
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        const result = JSON.parse(text);
        setDescription(result.description);
        setCurrentDate(result.current_date);
      })
      .then(() => {
        setSign(sign);
        figma.notify("Wish you well 🪄");
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function resetSign() {
    setSign("");
    setDescription("");
    setCurrentDate("");
  }

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  usePropertyMenu(
    [
      {
        itemType: "dropdown",
        propertyName: "signs",
        tooltip: "Zodiac signs",
        selectedOption: sign,
        options: signOptions,
      },
      {
        itemType: "action",
        tooltip: "Reset",
        propertyName: "reset",
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "reset") {
        resetSign();
      } else if (propertyName === "signs") {
        if (propertyValue) {
          waitForTask(getSign(propertyValue));
        } else {
          resetSign();
        }
      }
    }
  );

  function getSignImage(sign: string) {
    switch (sign) {
      case "aries":
        return Aries;
      case "taurus":
        return Taurus;
      case "gemini":
        return Gemini;
      case "cancer":
        return Cancer;
      case "leo":
        return Leo;
      case "virgo":
        return Virgo;
      case "libra":
        return Libra;
      case "scorpio":
        return Scorpio;
      case "sagittarius":
        return Sagittarius;
      case "capricorn":
        return Capricorn;
      case "aquarius":
        return Aquarius;
      case "pisces":
        return Pisces;
      default:
        return "";
    }
  }

  return (
    <AutoLayout direction={"vertical"} verticalAlignItems={"center"} horizontalAlignItems={"center"} width={360} cornerRadius={12} fill={CONTAINER_COLOR}>
      <AutoLayout direction={"vertical"} horizontalAlignItems={"center"} padding={{ bottom: 16 }} spacing={4} width={"fill-parent"} fill={HEADER_COLOR}>
        {sign ? (
          <Fragment>
            <SVG src={getSignImage(sign)} width={200} height={170} />
            <Text fill={TEXT_COLOR} fontSize={24}>
              {capitalizeFirstLetter(sign)}
            </Text>
          </Fragment>
        ) : (
          <Fragment>
            <SVG src={PlaceholderImage} width={200} height={170} />
            <Text fill={TEXT_COLOR} fontSize={24}>
              Choose Your Zodiac Sign
            </Text>
          </Fragment>
        )}
      </AutoLayout>
      {sign ? (
        <AutoLayout direction="vertical" padding={16} spacing={12} width={"fill-parent"}>
          <Text fontSize={24} width={"fill-parent"} horizontalAlignText={"center"} fill={EMPHASIS_TEXT_COLOR}>
            {currentDate}
          </Text>
          <Text fontSize={14} width={"fill-parent"} horizontalAlignText={"left"}>
            {description}
          </Text>
          <AutoLayout padding={{ top: 8 }} width={"fill-parent"}>
            <Text fontSize={12} width={"fill-parent"} horizontalAlignText={"center"} fill={GRAY_TEXT_COLOR}>
              Zodiac images by <Span href="https://www.freepik.com/free-vector/hand-drawn-zodiac-signs-set_14669618.htm#query=aries&position=26&from_view=search&track=sph">Freepik</Span>
            </Text>
          </AutoLayout>
        </AutoLayout>
      ) : null}
    </AutoLayout>
  );
}

widget.register(Widget);
