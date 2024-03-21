
# Crafting a Dynamic Stretchy Header in Flutter with Sliver AppBar

In the realm of mobile app development, captivating user interfaces (UIs) are paramount. Flutter, a leading framework for building beautiful apps, empowers you to create stunning layouts. The Sliver widget family unlocks these possibilities, and the SliverAppBar takes it a step further by enabling the creation of interactive, stretchy headers.

This comprehensive guide delves into the world of SliverAppBar in Flutter, guiding you through the steps of crafting a visually appealing and interactive stretchy header. We'll dissect the provided code snippet and explain its functionalities, making it a breeze for you to implement this technique in your own projects.

I think it is pointless to extend the article longer than necessary by explaining concepts that are already familiar to those who know Flutter a little, such as backgroundColor, title, actions and leading.

### Flexible Space

First, we can start by giving an image to the flexibleSpace area. This will be our entry point.

```
stretchModes: const [
    StretchMode.zoomBackground,
    StretchMode.fadeTitle,
    StretchMode.blurBackground,
],
```

With the stretch modes we will provide here, we can customize the animation that will occur on the image placed in background of FlexibleSpaceBar when we drag the list further down. To put it briefly, we enlarge the background image and also add blurry effect. Since we did not set a title to the FlexibleSpaceBar field, the title effect does not occur in this case, but we can test such a scenario in another example.

### Bottom

We want to create a title area with rounded corners with the bottom area. However, since we have given it to the bottom area, this area will move up and down with our scroll movement and will provide a harmonious appearance.

Since we need to add a widget in this area that complies with the PreferredSizeWidget protocol, we use PreferredSize and give it a height suitable for our design.

```
final scrollOffset = useState<double>(1);
const maxAnimExtent = 200;

useEffect(
    () {
        controller.addListener(() {
          final offset = controller.offset;
          scrollOffset.value = ((maxAnimExtent - offset) / maxAnimExtent).clamp(0, 1);
        });
        return null;
      },
const [],
);
```

At this point, I find it useful to explain the scrollOffset value I defined. We will use this value to make an animation on the borderRadius and change the opacity of the title area. As the user scrolls up the list, we will change the size of the image we give to flexibleSpace as the background and set the corner radius of the container we use in the bottom area. When the list is pulled down again, the cornerRadius will be animated again, creating a harmonious experience for the user.

```
pinned: true,
```

At this point, let's explain the reason why the pinned value is given as true. If we set this value to false, when the user scrolls up the list, the appbar animation would occur up to the top, but the AppBar would be pushed out of the page with additional scroll movement.

```
stretch: true,
```

Stretch, as the name suggests, allows our AppBar to extend further than what we initially defined when there is a downward movement and to enable the animations we provide through stretchModes to occur.


## Notes:

* The stretch feature does not work in the web version, so when you pull it downwards, there is no effect on the image. You can try it on your mobile devices by downloading the project to your computer from the link below.

## 🔗 Repository
To take a look at the full code, you can check out the repo below.

https://github.com/obenkucuk/flutter_cv


